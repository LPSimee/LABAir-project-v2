// Method used to convert the '-' character into the space character
export function convertDashToSpace(term: string): string {
    return term ? term.replaceAll(/-/g, ' ') : '';
}

// Reversed method of the first one
export function convertSpaceToDash(term: string): string {
    return term ? term.replaceAll(' ', '-') : '';
}

// Method used to make the first letter of a string uppercase
export function capitalizeFirstLetter(term: string): string {
    return term ? (term.charAt(0).toUpperCase() + term.slice(1)) : '';
}
