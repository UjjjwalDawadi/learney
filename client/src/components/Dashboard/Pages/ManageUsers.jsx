import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import BlockIcon from '@mui/icons-material/Block';
import FilterListIcon from '@mui/icons-material/FilterList';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';

// Sorting functions
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fullName');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student'); // Default to student

  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        if (response.data.students && response.data.teachers) {
          const combinedUsers = [...response.data.students, ...response.data.teachers];
          setUsers(combinedUsers);
          setLoading(false);
        }
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc'); // Toggle the sorting order
    setOrderBy(property);

    const sortedUsers = stableSort(users, getComparator(isAsc ? 'desc' : 'asc', property));
    setUsers(sortedUsers);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = users.map((user) => user.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangeRole = (event) => {
    setSelectedRole(event.target.value);
    setPage(0); // Reset page when role changes
  };

  const handleBlockUser = () => {
    // Implement block user functionality here
    console.log("Blocked users:", selected);
    // You can send a request to your backend to block these users
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(selected.length > 0 && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
          {selected.length > 0 ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {selected.length} selected
            </Typography>
          ) : (
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {selectedRole === 'student' ? 'Students' : 'Teachers'}
            </Typography>
          )}

          {selected.length > 0 ? (
            <Tooltip title="Block">
              <IconButton onClick={handleBlockUser}>
                <BlockIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}

          <Select
            value={selectedRole}
            onChange={handleChangeRole}
            sx={{ marginLeft: 'auto' }}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
          </Select>
        </Toolbar>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < users.length}
                    checked={users.length > 0 && selected.length === users.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all users',
                    }}
                  />
                </TableCell>
                <TableCell>
                <TableCell>
  <TableSortLabel
    active={orderBy === 'fullName'}
    direction={orderBy === 'fullName' ? order : 'asc'}
    onClick={() => handleRequestSort(null, 'fullName')} // Pass null for event and 'fullName' for property
  >
    Full Name
    {orderBy === 'fullName' ? (
      <Box component="span" sx={visuallyHidden}>
        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
      </Box>
    ) : null}
  </TableSortLabel>
</TableCell>


                </TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Contact</TableCell>
                <TableCell align="right">Address</TableCell> {/* New column for address */}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(
                users.filter(user => selectedRole === 'student' ? user.role === 'Student' : user.role === 'Teacher'),
                getComparator(order, orderBy)
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                const isItemSelected = isSelected(user.id);
                const labelId = `enhanced-table-checkbox-${user.id}`;
                
                return (
                  <TableRow
                    key={user.id}
                    hover
                    onClick={(event) => handleClick(event, user.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {user.fullName}
                    </TableCell>
                    <TableCell align="right">{user.username}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.contact}</TableCell>
                    <TableCell align="right">{user.address}</TableCell> {/* Render address */}
                  </TableRow>
                );
              })}
              {rowsPerPage > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * (rowsPerPage - Math.min(rowsPerPage, users.filter(user => selectedRole === 'student' ? user.role === 'Student' : user.role === 'Teacher').length - page * rowsPerPage)),
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.filter(user => selectedRole === 'student' ? user.role === 'Student' : user.role === 'Teacher').length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

export default EnhancedTable;
