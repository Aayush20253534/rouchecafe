export type SocialNetwork = "instagram" | "facebook" | "youtube" | "linkedin";
export type SocialProfile = { network: SocialNetwork; url: string };

/**
 * Only publish customer-confirmed social profiles.
 * Populate these entries after receiving official café handles.
 * Do not turn mockup logos into made-up live links.
 */
export const VERIFIED_SOCIAL_PROFILES: readonly SocialProfile[] = [];
