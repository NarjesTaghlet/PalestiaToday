export const errorMessages = {
    notEmptyErr: () => 'Ce champ ne peut pas être vide',
    MaxError: (maxLength: number) =>
        `La longueur maximale est de ${maxLength} caractères.`,
    MinError: (minLength: number) =>
        `La longueur minimale est de ${minLength} caractères.`,
};
