class UserModel {
  userName: string;
  profileDescription: string;
  posts: [PostModel];
  followers: [UserModel];
  following: [UserModel];
}
