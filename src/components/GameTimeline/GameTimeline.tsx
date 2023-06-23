import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';

import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import HourglassTopSharpIcon from '@mui/icons-material/HourglassTopSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';


export default function GameTimeline() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0', color: 'white'}}
          align="right"
          variant="body2"
        >
            <Typography variant="h6" component="span" sx={{ fontFamily: 'FiraCode-Semibold' }}>
                Página 1
            </Typography>
            <Typography sx={{ fontFamily: 'FiraCode-Light' }}>Título da Página 1</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot sx={{ color: 'white' }} variant="outlined">
            <ArrowDownwardSharpIcon  sx={{ color: 'white' }}/>
                       
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent 
        sx={{ py: '50px', px: 2, m: 'auto 0', color: 'white'}}
        variant="body2"
        >
          <Typography sx={{ fontFamily: 'FiraCode-Light' }}>
            Botão: Página 2
          </Typography>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0', color: 'white'}}
          align="right"
          variant="body2"
        >
            <Typography variant="h6" component="span" sx={{ fontFamily: 'FiraCode-Semibold' }}>
                Página 2
            </Typography>
            <Typography sx={{ fontFamily: 'FiraCode-Light' }}>Título da Página 2</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color='warning'>
            <HourglassTopSharpIcon  sx={{ color: 'white' }}/>
                       
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent 
        sx={{ py: '50px', px: 2, m: 'auto 0', color: 'white'}}
        variant="body2"
        >
          <Typography sx={{ fontFamily: 'FiraCode-Light' }}>
            Botão: Página 3
          </Typography>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0', color: 'white'}}
          align="right"
          variant="body2"
        >
            <Typography variant="h6" component="span" sx={{ fontFamily: 'FiraCode-Semibold' }}>
                Página 2
            </Typography>
            <Typography sx={{ fontFamily: 'FiraCode-Light' }}>Título da Página 2</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color='error'>
            <CloseSharpIcon  sx={{ color: 'white' }}/>
                       
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent 
        sx={{ py: '50px', px: 2, m: 'auto 0', color: 'white'}}
        variant="body2"
        >
          <Typography sx={{ fontFamily: 'FiraCode-Light' }}>
            Botão: Página 3
          </Typography>
        </TimelineContent>
      </TimelineItem>


      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0', color: 'white'}}
          align="right"
          variant="body2"
        >
            <Typography variant="h6" component="span" sx={{ fontFamily: 'FiraCode-Semibold' }}>
                Página 3
            </Typography>
            <Typography sx={{ fontFamily: 'FiraCode-Light' }}>Título da Página 3</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color='success'  >
            <CheckSharpIcon  sx={{ color: 'white' }}/>
                       
          </TimelineDot>
          
        </TimelineSeparator>
        <TimelineContent 
        sx={{ px: 2, m: 'auto 0', color: 'white'}}
        variant="body2"
        >
          <Typography sx={{ fontFamily: 'FiraCode-Light' }}>
            Botão: Página 3
          </Typography>
        </TimelineContent>
      </TimelineItem>


      
    </Timeline>
  );
}