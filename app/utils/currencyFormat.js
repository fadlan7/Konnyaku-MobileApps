export function currencyFormat(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

// export const url = 'https://01c0-125-166-0-114.ngrok-free.app';
export const url = 'http://10.10.102.39:8080';
