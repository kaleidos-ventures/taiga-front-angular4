export function calculateNextUrl(next, forceNext) {
    if (forceNext && forceNext !== "/login") {
        return forceNext;
    }

    if (next && next !== "/login") {
        return next;
    }

    return "/";
}
