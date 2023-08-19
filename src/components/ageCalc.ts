export const ageCalc = (date: string) => {
    const yearBirth: string | null = date ? date.split('.')[2] : null;
    const age = yearBirth ? new Date().getFullYear() - Number(yearBirth) : null;

    return age;
}