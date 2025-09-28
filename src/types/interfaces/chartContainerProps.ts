import type { Component } from 'vue'
import type { GraphConfig } from './graphConfig'

export interface ChartContainerProps {
  contentComponent: Component
  componentData: GraphConfig
}
