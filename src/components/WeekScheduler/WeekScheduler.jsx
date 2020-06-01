/* eslint-disable jsx-a11y/no-static-element-interactions,react/jsx-key */
import React, { useState } from 'react';
import * as moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import './WeekScheduler.css';

const renderHeaderBlocks = (totalBlocks, startingTime, className) => {
  const blocks = [];
  let currentDay = startingTime;
  for (let i = 0; i < totalBlocks; i++) {
    const currentBlockDayString = currentDay.format('dddd');
    blocks.push(
      <div className={className}>
        <div>{currentBlockDayString}</div>
        <div>{currentDay.format('D')}</div>
      </div>,
    );
    currentDay = currentDay.add(1, 'd');
  }
  return blocks;
};

const renderHours = (totalBlocks, startingTime, className) => {
  const blocks = [
    <div
      style={{ backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' }}
      className={className}
    />,
  ];
  let currentBlockHour = moment({ hour: startingTime, minute: 0 });
  for (let i = 0; i < totalBlocks; i++) {
    const currentBlockHourString = currentBlockHour.format('HH:mm');
    currentBlockHour = currentBlockHour.add(1, 'h');
    blocks.push(<div className={className}>{currentBlockHourString}</div>);
  }
  return blocks;
};

const renderBlocks = (
  startingTime,
  blocksPerDay,
  days,
  className,
  clickHandler,
) => {
  const blocks = [];
  const startingHour = startingTime.hour();
  for (let i = 0; i < blocksPerDay; i++) {
    let currentBlockTime = startingTime.hour(startingHour);
    for (let j = 0; j < days; j++) {
      const blockId = currentBlockTime.format('HHmmDDMMYYYY');
      currentBlockTime = currentBlockTime.add(1, 'h');
      blocks.push(
        <div
          onMouseEnter={clickHandler}
          onMouseDown={clickHandler}
          style={{ gridArea: `${i + 1}/${j + 1}/${i + 1}/${j + 1}` }}
          className={className}
          id={blockId}
        >
          {i + 1}/{j + 1}/{i + 1}/{j + 1}
        </div>,
      );
    }
    currentBlockTime = currentBlockTime.add(1, 'd');
  }
  return blocks;
};

const styles = (theme) => {
  const separation = '0.5em';
  const individualBlockStyles = {
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return {
    root: {
      display: 'grid',
      gridGap: separation,
      gridTemplateColumns: '1fr 11fr',
      gridTemplateRows: '1fr',
      gridTemplateAreas: '"hoursSidebar weekSchedule"',
    },
    hoursSidebar: {
      display: 'grid',
      gridArea: 'hoursSidebar',
      gridGap: separation,
      gridAutoRows: '50px',
    },
    weekSchedule: {
      display: 'grid',
      gridArea: 'weekSchedule',
      gridTemplateColumns: 'repeat(7,  1fr)',
      gridTemplateRows: '1fr 10fr',
      gridTemplateAreas:
        '"weekdayHeader weekdayHeader weekdayHeader weekdayHeader weekdayHeader weekdayHeader weekdayHeader" ' +
        '"dailySchedule dailySchedule dailySchedule dailySchedule dailySchedule dailySchedule dailySchedule"',
    },
    header: {
      display: 'grid',
      gridArea: 'weekdayHeader',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gridAutoRows: '50px',
      gridGap: separation,
    },
    slots: {
      display: 'grid',
      gridArea: 'dailySchedule',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gridTemplateRows: 'repeat(10, 1fr)',
      gridAutoRows: '50px',
      gridGap: separation,
    },
    slots2: {
      display: 'grid',
      gridArea: 'dailySchedule',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gridTemplateRows: 'repeat(10, 1fr)',
      gridAutoRows: '50px',
      gridGap: separation,
    },
    headerBlock: {
      ...individualBlockStyles,
      flexDirection: 'column',
    },
    hourBlock: {
      ...individualBlockStyles,
      backgroundColor: '#BDBDBD',
    },
    timeSlotBlock: {
      ...individualBlockStyles,
      backgroundColor: '#BDBDBD',
    },
    timeSlotBlock2: {
      ...individualBlockStyles,
      backgroundColor: '#51bd3c',
      gridArea: '6/2/6/2',
    },
  };
};

const BaseWeekScheduler = ({ classes }) => {
  const startingHour = 10;
  const blocksPerDay = 10;
  const days = 7;

  const [paintedBlocks, setPaintedBlocks] = useState([]);
  const [painting, setPainting] = useState(false);

  const handleMouseClick = (e) => {
    if (e.type === 'mousedown') {
      setPainting(true);
    } else {
      setPainting(false);
    }
  };
  const handleBlockSelection = (e) => {
    if (e.type === 'mousedown' || painting) {
      setPaintedBlocks([
        ...paintedBlocks,
        <div
          style={{ gridArea: e.target.innerHTML, backgroundColor: '#51bd3c' }}
          className={classes.timeSlotBlock}
        />,
      ]);
    }
  };

  const startOfTheWeek = moment().startOf('isoWeek').hour(10);

  return (
    <div
      onMouseDown={handleMouseClick}
      onMouseUp={handleMouseClick}
      className={classes.root}
    >
      <div className={classes.hoursSidebar}>
        {renderHours(blocksPerDay, startingHour, classes.hourBlock)}
      </div>
      <div className={classes.weekSchedule}>
        <div className={classes.header}>
          {renderHeaderBlocks(days, startOfTheWeek, classes.headerBlock)}
        </div>
        <div className={classes.slots}>
          {renderBlocks(
            startOfTheWeek,
            blocksPerDay,
            days,
            classes.timeSlotBlock,
            handleBlockSelection,
          )}
          {paintedBlocks}
        </div>
      </div>
    </div>
  );
};

BaseWeekScheduler.propTypes = {
  classes: PropTypes.object.isRequired,
};

const WeekSchedulerCore = withStyles(styles)(BaseWeekScheduler);

const WeekScheduler = () => (
  <Container className={'noselect'}>
    <WeekSchedulerCore />
  </Container>
);

export default WeekScheduler;
