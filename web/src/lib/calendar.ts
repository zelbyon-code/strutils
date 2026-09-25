export interface DayCell {
  date: Date | null;
  isToday: boolean;
}

/** Monday-first month grid, padded with null cells to complete full weeks. */
export function getMonthMatrix(year: number, month: number, today: Date = new Date()): DayCell[][] {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (first.getDay() + 6) % 7; // 0 = Monday

  const cells: DayCell[] = [];
  for (let i = 0; i < startOffset; i++) cells.push({ date: null, isToday: false });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    cells.push({ date, isToday: date.toDateString() === today.toDateString() });
  }
  while (cells.length % 7 !== 0) cells.push({ date: null, isToday: false });

  const weeks: DayCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function sameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}
