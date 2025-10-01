import type { Component } from 'vue'
import type { GraphConfig } from './graphConfig'

// NOTE: id need for control source data from select to main
export interface ChartContainerProps {
  contentComponent: Component
  componentData: GraphConfig
  id: string
  title: string
}
