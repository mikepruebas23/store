import { User } from "../../shared/models/user.interFace";

export class RoleValidator {
    isSuscriptor(user: User): boolean {
        return user.role == 'SUSCRIPTOR';
    }

    isEditor(user: User): boolean {
        return user.role == 'EDITOR';
    }

    isAdmin(user: User): boolean {
        return user.role == 'ADMIN';
    }
}