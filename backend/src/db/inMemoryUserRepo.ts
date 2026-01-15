import { randomUUID } from "crypto";

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

class InMemoryUserRepo {
  private byEmail = new Map<string, User>();
  private byId = new Map<string, User>();

  create(email: string, passwordHash: string): User {
    const user: User = {
      id: randomUUID(),
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    this.byEmail.set(email, user);
    this.byId.set(user.id, user);
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.byEmail.get(email);
  }

  findById(id: string): User | undefined {
    return this.byId.get(id);
  }
}

export const userRepo = new InMemoryUserRepo();
