/*
 * SonarQube
 * Copyright (C) 2009-2023 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import { MultiSelect } from './MultiSelect';

interface Props {
  clearIconAriaLabel: string;
  createElementLabel: string;
  headerLabel: string;
  listSize: number;
  noResultsLabel: string;
  onSearch: (query: string) => Promise<void>;
  onSelect: (item: string) => void;
  onUnselect: (item: string) => void;
  searchInputAriaLabel: string;
  selectedTags: string[];
  tags: string[];
}

export function TagsSelector(props: Props) {
  const {
    clearIconAriaLabel,
    createElementLabel,
    headerLabel,
    listSize,
    noResultsLabel,
    searchInputAriaLabel,
    selectedTags,
    tags,
  } = props;

  return (
    <MultiSelect
      clearIconAriaLabel={clearIconAriaLabel}
      createElementLabel={createElementLabel}
      elements={tags}
      headerNode={<div className="sw-mt-4 sw-font-semibold">{headerLabel}</div>}
      listSize={listSize}
      noResultsLabel={noResultsLabel}
      onSearch={props.onSearch}
      onSelect={props.onSelect}
      onUnselect={props.onUnselect}
      placeholder={searchInputAriaLabel}
      searchInputAriaLabel={searchInputAriaLabel}
      selectedElements={selectedTags}
      validateSearchInput={validateTag}
    />
  );
}

export function validateTag(value: string) {
  // Allow only a-z, 0-9, '+', '-', '#', '.'
  return value.toLowerCase().replace(/[^-a-z0-9+#.]/gi, '');
}
