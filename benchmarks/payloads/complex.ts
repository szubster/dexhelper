interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

type PartialUser = Partial<User>;

export class UserManager {
  private users: Map<number, User> = new Map();

  addUser(user: User): void {
    this.users.set(user.id, user);
  }

  getUser(id: number): User | undefined {
    return this.users.get(id);
  }

  updateUser(id: number, data: PartialUser): boolean {
    const user = this.users.get(id);
    if (!user) return false;

    this.users.set(id, { ...user, ...data });
    return true;
  }
}

const manager = new UserManager();
manager.addUser({ id: 1, name: "Alice", email: "alice@example.com", roles: ["admin"] });
console.log(manager.getUser(1));
