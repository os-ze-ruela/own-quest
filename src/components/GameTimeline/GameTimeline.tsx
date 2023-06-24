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


interface Page {
  button_answer: null | string;
  button_id: null | string;
  id: number;
  page_game_id: number;
  page_title: string;
}

interface GameTimelineProps {
  historic: Page[];
  is_ongoing: boolean;
  is_finished: boolean;
  not_possible_continue: boolean;
}


export default function GameTimeline({ historic, is_ongoing, is_finished, not_possible_continue }: GameTimelineProps) {
  return (
    <Timeline>
      {historic ? 
      <>
      {historic.map((page, index) => (
        <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0', color: 'white'}}
          align="right"
          variant="body2"
        >
            <Typography variant="h6" component="span" sx={{ fontFamily: 'FiraCode-Semibold' }}>
                Página {index+1}
            </Typography>
            <Typography sx={{ fontFamily: 'FiraCode-Light' }}>{page.page_title}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>

          <TimelineConnector />

          {page.button_answer !== null ? (
                  <>
                  <TimelineDot sx={{ color: 'white' }} variant="outlined">
                    <ArrowDownwardSharpIcon  sx={{ color: 'white' }}/>
                  </TimelineDot>
                  </>
                ) : (
                  <>
                  {is_ongoing ? (
                  <TimelineDot color='warning'>
                    <HourglassTopSharpIcon  sx={{ color: 'white' }}/>
                  </TimelineDot>
                  ) : is_finished ? (
                    <TimelineDot color="success">
                      <CheckSharpIcon sx={{ color: 'white' }} />
                    </TimelineDot>
                  ) : not_possible_continue ? (
                    <TimelineDot color="error">
                      <CloseSharpIcon sx={{ color: 'white' }} />
                    </TimelineDot>
                  ) : (
                    <TimelineDot variant="outlined" sx={{ color: 'white' }}>
                      <ArrowDownwardSharpIcon sx={{ color: 'white' }} />
                    </TimelineDot>
                  )}
                </>
                )}


          {page.button_answer !== null && (
            <TimelineConnector />
          )}
          
        </TimelineSeparator>

        {page.button_answer !== null ? (
        <TimelineContent 
        sx={{ py: '50px', px: 2, m: 'auto 0', color: 'white'}}
        variant="body2"
        >
          <Typography sx={{ fontFamily: 'FiraCode-Light' }}>
            Botão: {page.button_answer}
          </Typography>
        </TimelineContent>
          
        ) : (
          <TimelineContent 
          sx={{ px: 2, m: 'auto 0', color: 'white'}}
          variant="body2"
          >
           <Typography sx={{ fontFamily: 'FiraCode-Light' }}>
              {is_ongoing ? "História em andamento"
                : is_finished ? "História finalizada" 
                : not_possible_continue ? "Não é possível finalizar história" 
                : ""}
          </Typography>
          </TimelineContent>
          )}

      </TimelineItem>
      ))}
      </>
      : <></>}
    </Timeline>
  );
}