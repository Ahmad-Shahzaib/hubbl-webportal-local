import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import TableToolBar from "dan-components/Tables/tableParts/TableToolBar";
import CustomToolbar from "./CustomToolbar";
import CustomToolbarSelect from "./CustomToolbarSelect";

const styles = (theme) => ({
  table: {
    "& > div": {
      overflow: "auto",
    },
    "& table": {
      "& td": {
        wordBreak: "keep-all",
      },
      [theme.breakpoints.down("md")]: {
        "& td": {
          height: 60,
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
  },
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
function AdvFilter(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [numSelected, setNumSelected] = useState([]);
  const {
    classes,
    data,
    columns,
    onAdd,
    onEdit,
    onDelete,
    onStatusChange,
    onSelect,
    title,
    noActionButton,
    noStatusButton,
    noEditButton,
    noDeleteButton,
    noAddButton,
    additionalButtons,
    selectableRowsOnClick,
    selectableRowsHideCheckboxes,
    rowHover,
    rowsSelected,
    menuPrefix,
  } = props;

  useEffect(() => {
    onSelect({ indexes: numSelected });
  }, [numSelected]);

  return (
    <div className={classes.table}>
      {/* <TableToolBar numSelected={numSelected.length} /> */}
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={{
          rowHover: rowHover || true,
          jumpToPage: true,
          searchPlaceholder: "Search...",
          selectableRowsOnClick: selectableRowsOnClick || false,
          selectableRowsHideCheckboxes: selectableRowsHideCheckboxes || false,
          filterType: "multiselect",
          responsive: "standard",
          print: true,
          rowsPerPage: rowsLimit,
          page: currentPage,
          pagination: true,
          rowsSelected: rowsSelected || [],
          selectableRows: "multiple",
          onChangePage: (number) => setCurrentPage(number),
          onChangeRowsPerPage: (number) => setRowsLimit(number),
          onRowSelectionChange: (current, all, rows) => {
            setNumSelected(all);
          },
          customToolbar: () => {
            return noActionButton || noAddButton ? null : (
              <CustomToolbar
                numSelected={numSelected.length}
                onAdd={onAdd}
                menuPrefix={menuPrefix}
              />
            );
          },

          customToolbarSelect: () => {
            return noActionButton ? null : (
              <CustomToolbarSelect
                numSelected={numSelected ? numSelected.length : 0}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
                noStatusButton={noStatusButton}
                noEditButton={noEditButton}
                noDeleteButton={noDeleteButton}
                additionalButtons={additionalButtons}
                menuPrefix={menuPrefix}
              />
            );
          },
        }}
      />
    </div>
  );
}

AdvFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvFilter);
