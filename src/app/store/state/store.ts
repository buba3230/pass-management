export function clearSessionStorage() {
    sessionStorage.clear();
}

export function getItem(key: string) {
    return JSON.parse(sessionStorage.getItem(key));
}

export function setItem(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value))
}