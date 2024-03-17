import { Entity, Fields, Remult } from 'remult';

@Entity("users", {
    allowApiCrud: true
})
export class UserModel {
    @Fields.autoIncrement()
    id: number = 0;
    
    @Fields.string()
    username: string = "";

    @Fields.string()
    email: string = "";

    @Fields.string()
    password: string = "";

    remult: Remult;

    async create(user: UserModel): Promise<UserModel> {
        try {
            const result = await this.remult.repo(UserModel).create();
            result.username = user.username;
            result.email = user.email;
            result.password = user.password;
            await result.save();
            return result;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    async findById(id: number): Promise<UserModel | null> {
        try {
            const user = await this.remult.repo(UserModel).find(id);
            return user;
        } catch (error) {
            console.error("Error finding user by id:", error);
            throw error;
        }
    }

    async update(): Promise<void> {
        try {
            await this.save();
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    }

    async delete(): Promise<void> {
        try {
            await this.remult.repo(UserModel).delete(this.id);
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }
}

// Export UserModel
export { UserModel as User };
