import React, { useEffect } from 'react';
import { render } from '@testing-library/react';

// Small helper component that updates document.title when mounted
function TitleSetter({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <div>Title set to: {title}</div>;
}

test('updates document.title when component mounts', () => {
  const originalTitle = document.title;
  const newTitle = 'Test Document Title';

  render(<TitleSetter title={newTitle} />);

  expect(document.title).toBe(newTitle);

  // cleanup: restore original title
  document.title = originalTitle;
});
