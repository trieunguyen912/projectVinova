import * as React from 'react';
import Pagination from '@mui/material/Pagination';


function PageIndex(props) {
  const {count, page, setPage} = props
  //const [page, setPage] = useState(1);
  const handleChangePage = (event, value)=>{
    // setPage({
    //   pageIndex: value,
    //   pageSize: 10,
    // })
    setPage(page =>({...page, pageIndex: value}))
  }
  return (
      <Pagination sx={{ position: "absolute",  right: 50, zIndex: 1900 }} color="primary" page={page.pageIndex} onChange={handleChangePage} count={count} />
  )
}

export default PageIndex