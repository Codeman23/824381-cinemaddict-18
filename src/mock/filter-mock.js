import { filters } from '../util';

export const generateFilters = (filtersData) => Object.entries(filters).map(
  ([filterName, filterTasks]) => ({name: filterName,count: filterTasks(filtersData).length,}),
);
