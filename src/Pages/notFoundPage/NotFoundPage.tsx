import { FC } from "react";

const styles = {
    container: {
      minHeight: 'calc(100vh - 50px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontWeight: 500,
      fontSize: 42,
      textAlign: 'center',
    },
  };
  
 const NotFoundPage:FC =()=>{
    return (
      <div style={styles.container}>
        <h1
          style={{
            fontSize: 48,
            textAlign: 'center',
          }}
        >
          Error 404. Page not found
        </h1>
      </div>
    );
  };
  export default NotFoundPage;