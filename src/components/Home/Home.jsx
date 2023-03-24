import React from 'react';

import LegendsConfiguration from '../LegendsConfiguration/LegendsConfiguration';

/**
 * This component stitches everything in the app and renders the whole application
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */

function Home() {
  /**
   * This component renders the landing page along with rendering Navbar, Line chart,TimeFilter, Indicators and legends
   */
  return <LegendsConfiguration />;
}

export default Home;
