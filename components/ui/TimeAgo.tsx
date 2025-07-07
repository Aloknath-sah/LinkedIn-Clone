'use client';

import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

// Register locale once
TimeAgo.addLocale(en);

type Props = {
  date: Date | string;
};

const TimeAgoComponent = ({ date }: Props) => {
  return (
    <ReactTimeAgo
      date={new Date(date)}
      locale="en"
      timeStyle="round" // or 'twitter' or 'mini'
    />
  );
};

export default TimeAgoComponent;
