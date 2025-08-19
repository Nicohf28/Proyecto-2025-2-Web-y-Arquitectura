// decorators/withBadge.js
import React from "react";

const withBadge = (WrappedComponent, badgeText) => {
  return (props) => (
    <div className="relative">
      <WrappedComponent {...props} />
      <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg">
        {badgeText}
      </span>
    </div>
  );
};

export default withBadge;
