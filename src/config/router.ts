interface IRoter {
    [key: string]: string;

    COUNTDOWN_PAGE: string;
    FIREWORKS_PAGE: string;
    NEWYAER_PAGE: string;
}

export const Router: IRoter = {
    COUNTDOWN_PAGE: "/",
    FIREWORKS_PAGE: "/fireworks",
    NEWYAER_PAGE: "/newyear",
}