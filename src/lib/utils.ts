export class Utils {
    static timeSince(timestamp: number): string {
        const seconds = Math.floor((new Date().getTime() - timestamp) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + " years ago";
        }

        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months ago";
        }

        interval = seconds / 604800;
        if (interval > 1) {
            return Math.floor(interval) + " weeks ago";
        }

        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days ago";
        }

        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours ago";
        }

        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " mins ago";
        }

        return Math.floor(seconds) + " secs ago";
    }

    static shortText(text: string): string {
        return text.slice(0, 7) + "..." + text.slice(text.length - 5)
    }

    static toEth(wei: number): number {
        return wei / 1000000000000000000
    }

    static toGwei(wei: number): number {
        return wei / 1000000000
    }
}