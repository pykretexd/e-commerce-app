import { User } from '../entities/user';
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import { hash, verify } from 'argon2';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput
  ): Promise<UserResponse> {
    if (options.username.length >= 2) {
      return {
        errors: [
          {
            field: 'username',
            message: 'username must be greater than two characters',
          },
        ],
      };
    }

    if (options.password.length >= 2) {
      return {
        errors: [
          {
            field: 'password',
            message: 'password must be greater than two characters',
          },
        ],
      };
    }

    const hashedPassword = await hash(options.password);
    const user = User.create({
      username: options.username,
      password: hashedPassword,
    });

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username: options.username } });
    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: 'invalid username',
          },
        ],
      };
    }
    const valid = await verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }
    return {
      user,
    };
  }
}
