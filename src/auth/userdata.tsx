// classes/UserData.ts
import type Keycloak from "keycloak-js";
import type { KeycloakProfile } from "keycloak-js";

export class UserData {
    private keycloak: Keycloak;
    private profile: KeycloakProfile | null = null;

    constructor(keycloak: Keycloak) {
        this.keycloak = keycloak;
    }
    async loadProfile(): Promise<void> {
        if (this.keycloak.authenticated) {
            try {
                this.profile = await this.keycloak.loadUserProfile();
            } catch (error) {
                console.error("Failed to load user profile:", error);
                throw error;
            }
        }
    }

    get isAuthenticated(): boolean {
        return !!this.keycloak.authenticated;
    }

    get username(): string {
        return this.profile?.username || this.keycloak.tokenParsed?.preferred_username || "N/A";
    }

    get email(): string {
        return this.profile?.email || this.keycloak.tokenParsed?.email || "N/A";
    }

    get firstName(): string {
        return this.profile?.firstName || this.keycloak.tokenParsed?.given_name || "N/A";
    }

    get lastName(): string {
        return this.profile?.lastName || this.keycloak.tokenParsed?.family_name || "N/A";
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`.trim() || "N/A";
    }

    get roles(): string[] {
        return this.keycloak.tokenParsed?.realm_access?.roles || [];
    }

    hasRole(role: string): boolean {
        return this.roles.includes(role);
    }

    get token(): string | undefined {
        return this.keycloak.token;
    }

    get tokenParsed(): any {
        return this.keycloak.tokenParsed;
    }

    async logout(): Promise<void> {
        await this.keycloak.logout();
    }

    // Get all available user info as an object
    getAllUserInfo(): Record<string, any> {
        return {
            username: this.username,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.fullName,
            roles: this.roles,
            isAuthenticated: this.isAuthenticated,
            profile: this.profile,
            tokenInfo: this.tokenParsed
        };
    }
}
