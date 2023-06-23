import React from 'react';
import { IColumns } from '../model/types';

export const TableHeader: React.FC<IColumns> = ({ columns }) => (
  <thead>
    <tr>
      {columns.map((column, index) => (
        <th key={index}>{column.header}</th>
      ))}
    </tr>
  </thead>
);
