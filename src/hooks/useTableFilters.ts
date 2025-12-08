import { useState, useMemo } from "react";
import { format, isWithinInterval, startOfDay, endOfDay, parseISO } from "date-fns";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export function useTableFilters<T extends { created_at: string | null }>(
  data: T[],
  searchFields: (keyof T)[]
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search filter
      const matchesSearch = searchFields.some((field) => {
        const value = item[field];
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });

      if (!matchesSearch) return false;

      // Date range filter
      if (dateRange.from || dateRange.to) {
        const itemDate = item.created_at ? parseISO(item.created_at) : null;
        if (!itemDate) return false;

        if (dateRange.from && dateRange.to) {
          return isWithinInterval(itemDate, {
            start: startOfDay(dateRange.from),
            end: endOfDay(dateRange.to),
          });
        } else if (dateRange.from) {
          return itemDate >= startOfDay(dateRange.from);
        } else if (dateRange.to) {
          return itemDate <= endOfDay(dateRange.to);
        }
      }

      return true;
    });
  }, [data, searchQuery, dateRange, searchFields]);

  return {
    searchQuery,
    setSearchQuery,
    dateRange,
    setDateRange,
    filteredData,
  };
}

export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  columns: { key: keyof T; header: string }[],
  filename: string
) {
  const headers = columns.map((col) => col.header).join(",");
  const rows = data.map((row) =>
    columns
      .map((col) => {
        const value = row[col.key];
        // Handle strings with commas or quotes
        if (typeof value === "string") {
          if (value.includes(",") || value.includes('"') || value.includes("\n")) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }
        return value ?? "";
      })
      .join(",")
  );

  const csvContent = [headers, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}_${format(new Date(), "yyyy-MM-dd")}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}
