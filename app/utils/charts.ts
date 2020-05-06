export const LINE_CHART_CONFIG = {
  labelColor: () => 'rgba(153, 153, 153, 1)',
  color: () => '#000',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  propsForBackgroundLines: {
    stroke: '#000',
  },
};

export const BAR_CHART_CONFIG = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: () => 'rgba(0, 0, 0, 1)',
  labelColor: () => 'rgba(153, 153, 153, 1)',
  style: {
    borderRadius: 0,
  },
  propsForBackgroundLines: {
    strokeDasharray: false,
  },
  renderVerticalLabels: {
    paddingRight: 2,
  },
};
export const CHART_HEIGHT = 190;
