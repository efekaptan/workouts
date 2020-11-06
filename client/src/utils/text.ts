export function truncate(description: string, length: number) {
    return description.length > length ? `${description.substr(0, length)}...` : description;
}

export function getByTestId(element: Element | null, testId: string) {
    return element?.querySelector(`[data-testid='${testId}']`);
}
