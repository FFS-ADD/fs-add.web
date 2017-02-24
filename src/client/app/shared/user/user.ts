export class User{
  constructor(
    public id: string,
    public role: string,
    public project: string,
    public avatar: string,
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
  ) {  }
}

