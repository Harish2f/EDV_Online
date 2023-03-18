import styled from 'styled-components';

/**
 * This component consists of stylings for the line chart
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */

const Chart = styled.div`
  height: ${(props) => {
    return props.height;
  }};
  > * {
    > * {
      > * {
        &:nth-child(2) {
          height: 3px !important;
          > * {
            & {
              /* background-color: white !important; */
              background-color: blue !important;
            }
          }
        }

        &:nth-child(4) {
          height: 3px !important;
          > * {
            & {
              background-color: yellow !important;
            }
          }
        }

        &:nth-child(6) {
          height: 3px !important;
          > * {
            & {
              background-color: red !important;
            }
          }
        }
      }
    }
  }
`;

export default Chart;
