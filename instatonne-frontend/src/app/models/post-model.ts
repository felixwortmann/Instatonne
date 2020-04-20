class PostModel {
  id: string;
  imageUrl: string;
  author: UserModel;
  comments: [CommentModel];
}
