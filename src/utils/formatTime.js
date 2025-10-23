export function formatTime(minutes) {
    if (minutes < 60) {
        return `${minutes}`;
    }
    const hours = Math.floor(minutes/60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}`;
}