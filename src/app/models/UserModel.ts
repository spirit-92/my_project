export interface UserModel {
  user:{
    user_id: number,
    user_name: string
    password: string,
    email: string,
    avatar: string,
    avatarSocial:string,
    status_id: number,
    created_at: string
  }
}
export interface UserAllModel {
    user_name: string
    email: string,
    avatar: string,
    avatarSocial:string,
    created_at: string

}
