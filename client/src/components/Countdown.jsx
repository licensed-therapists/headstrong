import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';

const Countdown = () => {
  const [event, setEvent] = useState('');
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [story, setStory] = useState('');
  const [countdown, setCountdown] = useState('');

  const getDate = async () => {
    try {
      const response = await axios.get('/api/stories');
      const { date } = response.data;
      if (date) {
        setDate(new Date(date));
      }
    } catch (err) {
      console.error('Failed to GET date from db to client:', err);
    }
  }

  const getStory = async () => {
    try {
      const response = await axios.get('/api/stories');
      const { story } = response.data;
      setStory(story);
    } catch (err) {
      console.error('Failed to GET story from db to client:', err);
    }
  }

  useEffect(() => {
    getDate();
    getStory();
  }, [])

  const handleEventChange = (e) => {
    const { value } = e.target;
    setEvent(value);
  }

  const handleTaskChange = (e) => {
    const { value } = e.target;
    setTask(value);
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/stories', { event, task, date });
      const { text } = response.data.choices[0];
      console.log(text);
      setStory(text);
    } catch (err) {
      console.error('Failed to POST text to API at client:', err);
    }
  }

  const handleDateChange = (e) => {
    const { value } = e.target;
    const [year, month, day] = value.split('-');
    const newDate = new Date(year, month - 1, day); // month is zero-based
    setDate(newDate);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {

      if (date) {
        const now = new Date();
        const timeDifference = date.getTime() - now.getTime();

        if (!timeDifference) {
          setCountdown('Countdown is over!');
          clearInterval(intervalId);
        } else {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          const formatDays = () => (
            days > 1 ? `${days} days\n`
            : (days === 1) ? `${days} day\n`
            : ''
          )

          setCountdown(`${formatDays()} ${hours} hours\n${minutes} minutes\n${seconds} seconds`);
        }
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [date]);

  const countdownStyle = {
    color: 'red',
    fontSize: '24px',
    lineHeight: '1.5',
    whiteSpace: 'pre-line',
    textAlign: 'center'
  };

  const daysStyle = {
    fontSize: '64px',
    fontWeight: 'bold',
  };

  const pageStyle = {
    color: 'white',
    background: 'black',
    padding: '200px',
  };

  return (
    <div style={pageStyle}>
      <Typography component="div" style={countdownStyle}>
        {countdown ? (
          countdown.split('\n').map((line, i) => {
            if (i === 0) {
              return <span key={i} style={daysStyle}>{line}{'\n'}</span>;
            }
            // if (i !== countdown.split('\n').length - 1) {
            //   return `${line}, `;
            // }
            return line + `\n`;
          })
        ) : null}
      </Typography>
      <div>{story ? story : null}</div>
      Event:<input type="text" onChange={handleEventChange}></input>
      Task:<input type="text" onChange={handleTaskChange}></input>
      Date:<input type="date" onChange={handleDateChange}></input>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Countdown;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';


// const Countdown = () => {
//   const [event, setEvent] = useState('');
//   const [task, setTask] = useState('');
//   const [date, setDate] = useState('');
//   const [story, setStory] = useState('');
//   const [countdown, setCountdown] = useState('');

//   const getDate = async () => {
//     try {
//       const response = await axios.get('/api/stories');
//       const { date } = response.data;
//       if (date) {
//         setDate(new Date(date));
//       }
//     } catch (err) {
//       console.error('Failed to GET date from db to client:', err);
//     }
//   }

//   const getStory = async () => {
//     try {
//       const response = await axios.get('/api/stories');
//       const { dbStory } = response.data;
//       if (story === '') {
//         setStory(dbStory);
//       }
//     } catch (err) {
//       console.error('Failed to GET story from db to client:', err);
//     }
//   }

//   useEffect(() => {
//     getDate();
//     getStory();
//   }, [])

//   const handleEventChange = (e) => {
//     const { value } = e.target;
//     setEvent(value);
//   }

//   const handleTaskChange = (e) => {
//     const { value } = e.target;
//     setTask(value);
//   }

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post('/api/stories', { event, task, date });
//       const { text } = response.data.choices[0];
//       console.log(text);
//       setStory(text);
//     } catch (err) {
//       console.error('Failed to POST text to API at client:', err);
//     }
//   }

//   const handleDateChange = (e) => {
//     const { value } = e.target;
//     const [year, month, day] = value.split('-');
//     const newDate = new Date(year, month - 1, day); // month is zero-based
//     setDate(newDate);
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {

//       if (date) {
//         const now = new Date();
//         const timeDifference = date.getTime() - now.getTime();

//         if (!timeDifference) {
//           setCountdown('Countdown is over!');
//           clearInterval(intervalId);
//         } else {
//           const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//           const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//           const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//           const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

//           const formatDays = () => (
//             days > 1 ? `${days} days\n`
//             : (days === 1) ? `${days} day\n`
//             : null
//           )

//           setCountdown(`${formatDays()} ${hours} hours\n${minutes} minutes\n${seconds} seconds`);
//         }
//       }
//     }, 1000);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [date]);

//   const pageStyle = {
//     padding: '200px',
//     textAlign: 'center',
//   };

//   const countdownStyle = {
//     color: 'red',
//     fontSize: '24px',
//     lineHeight: '1.5',
//     whiteSpace: 'pre-line',
//     marginBottom: '20px'
//   };

//   const daysStyle = {
//     fontSize: '64px',
//     fontWeight: 'bold',
//   };

//   const storyStyle = {
//     marginBottom: '20px'
//   }

//   const inputStyle = {
//     margin: '20px'
//   }

//   return (
//     <div style={pageStyle}>
//       <Typography component="div" style={countdownStyle}>
//         {countdown ? (
//           countdown.split('\n').map((line, i) => {
//             if (i === 0) {
//               return <span key={i} style={daysStyle}>{line}{'\n'}</span>;
//             }
//             // if (i !== countdown.split('\n').length - 1) {
//             //   return `${line}, `;
//             // }
//             return line + `\n`;
//           })
//         ) : null}
//       </Typography>
//       <Box
//         sx={{
//           background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
//         }}><div style={storyStyle}>{story ? story : null}</div>
//       </Box>
//       <Box component="form">
//       <TextField type="text" onChange={handleEventChange} variant="outlined" label="Event" size="small" sx={{
//           backgroundColor: 'white',
//           borderRadius: '10px',
//         }}></TextField>
//       <TextField type="text" onChange={handleTaskChange} variant="outlined" label="Task" size="small" sx={{
//           backgroundColor: 'white',
//           borderRadius: '10px'
//         }}></TextField>
//       <TextField type="date" onChange={handleDateChange} variant="outlined" size="small" sx={{
//           backgroundColor: 'white',
//           borderRadius: '10px'
//         }}></TextField>
//       <Button type="submit" onClick={handleSubmit} style={inputStyle} variant="contained">Submit</Button>
//       </Box>
//     </div>
//   )
// }

// export default Countdown;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Box from '@mui/material/Box';
// // import Typography from '@mui/material/Typography';
// // import TextField from '@mui/material/TextField';
// // import Button from '@mui/material/Button';


// // const Countdown = () => {
// //   const [event, setEvent] = useState('');
// //   const [task, setTask] = useState('');
// //   const [date, setDate] = useState('');
// //   const [story, setStory] = useState('');
// //   const [countdown, setCountdown] = useState('');

// //   const getDate = async () => {
// //     try {
// //       const response = await axios.get('/api/stories');
// //       const { date } = response.data;
// //       if (date) {
// //         setDate(new Date(date));
// //       }
// //     } catch (err) {
// //       console.error('Failed to GET date from db to client:', err);
// //     }
// //   }

// //   const getStory = async () => {
// //     try {
// //       const response = await axios.get('/api/stories');
// //       const { story } = response.data;
// //       setStory(story);
// //     } catch (err) {
// //       console.error('Failed to GET story from db to client:', err);
// //     }
// //   }

// //   useEffect(() => {
// //     getDate();
// //     getStory();
// //   }, [])

// //   const handleEventChange = (e) => {
// //     const { value } = e.target;
// //     setEvent(value);
// //   }

// //   const handleTaskChange = (e) => {
// //     const { value } = e.target;
// //     setTask(value);
// //   }

// //   const handleSubmit = async () => {
// //     try {
// //       const response = await axios.post('/api/stories', { event, task, date });
// //       const { text } = response.data.choices[0];
// //       console.log(text);
// //       setStory(text);
// //     } catch (err) {
// //       console.error('Failed to POST text to API at client:', err);
// //     }
// //   }

// //   const handleDateChange = (e) => {
// //     const { value } = e.target;
// //     const [year, month, day] = value.split('-');
// //     const newDate = new Date(year, month - 1, day); // month is zero-based
// //     setDate(newDate);
// //   };

// //   useEffect(() => {
// //     const intervalId = setInterval(() => {

// //       if (date) {
// //         const now = new Date();
// //         const timeDifference = date.getTime() - now.getTime();

// //         if (!timeDifference) {
// //           setCountdown('Countdown is over!');
// //           clearInterval(intervalId);
// //         } else {
// //           const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
// //           const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// //           const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
// //           const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

// //           const formatDays = () => (
// //             days > 1 ? `${days} days\n`
// //             : (days === 1) ? `${days} day\n`
// //             : null
// //           )

// //           setCountdown(`${formatDays()} ${hours} hours\n${minutes} minutes\n${seconds} seconds`);
// //         }
// //       }
// //     }, 1000);

// //     return () => {
// //       clearInterval(intervalId);
// //     };
// //   }, [date]);

// //   const pageStyle = {
// //     padding: '200px',
// //     textAlign: 'center',
// //   };

// //   const countdownStyle = {
// //     color: 'red',
// //     fontSize: '24px',
// //     lineHeight: '1.5',
// //     whiteSpace: 'pre-line',
// //     marginBottom: '20px'
// //   };

// //   const daysStyle = {
// //     fontSize: '64px',
// //     fontWeight: 'bold',
// //   };

// //   const storyStyle = {
// //     marginBottom: '20px'
// //   }

// //   return (
// //     <div style={pageStyle}>
// //       <Typography component="div" style={countdownStyle}>
// //         {countdown ? (
// //           countdown.split('\n').map((line, i) => {
// //             if (i === 0) {
// //               return <span key={i} style={daysStyle}>{line}{'\n'}</span>;
// //             }
// //             // if (i !== countdown.split('\n').length - 1) {
// //             //   return `${line}, `;
// //             // }
// //             return line + `\n`;
// //           })
// //         ) : null}
// //       </Typography>
// //       <Box
// //         sx={{
// //           background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
// //         }}><div style={storyStyle}>{story ? story : null}</div>
// //       </Box>
// //       <Box component="form"
// //         sx={{
// //           display: 'flex',
// //           flexDirection: 'row',
// //           justifyContent: 'center',
// //           gap: '10px',
// //           marginBottom: '20px',
// //         }}>
// //       <TextField type="text" onChange={handleEventChange} variant="outlined" label="Event" size="small" sx={{
// //           backgroundColor: 'white',
// //           borderRadius: '10px',
// //         }}></TextField>
// //       <TextField type="text" onChange={handleTaskChange} variant="outlined" label="Task" size="small" sx={{
// //           backgroundColor: 'white',
// //           borderRadius: '10px'
// //         }}></TextField>
// //       <TextField type="date" onChange={handleDateChange} variant="outlined" size="small" sx={{
// //           backgroundColor: 'white',
// //           borderRadius: '10px'
// //         }}></TextField>
// //       <Button type="submit" onClick={handleSubmit} variant="contained">Submit</Button>
// //       </Box>
// //     </div>
// //   )
// // }

// // export default Countdown;
