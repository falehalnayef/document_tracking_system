"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(data) {
        this.user_id = data.user_id;
        this.user_name = data.user_name;
        this.email = data.email;
        this.password = data.password;
    }
    display() {
        return {
            user_id: this.user_id,
            user_name: this.user_name,
            email: this.email,
        };
    }
}
exports.default = User;
