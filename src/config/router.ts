interface IRoter {
    [key: string]: string;

    COUNTDOWN_PAGE: string;
    FIREWORKS_PAGE: string;
    WISH_PAGE: string;
}

export const Router: IRoter = {
    COUNTDOWN_PAGE: "/",
    FIREWORKS_PAGE: "/fireworks",
    WISH_PAGE: "/wishs",
}