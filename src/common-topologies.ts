// import { orgList, IOrganization } from '../../data/topologies'
// import { TopoData } from './types'
import common from './data/topologies.json'

interface ITopoData {
  [key: string]: number
 }

 interface IOrganization {
   name: string,
   data: ITopoData
 }

const orgList: IOrganization[] = common

type TopoData = [string, number]

const topoList: TopoData[] = genTopoList(orgList)
const topoCount = aggregate(/.+/)

/**
 * Generate to topology list from organization data.
 *
 * @param orgList a list of IOrganization objects
 */
function genTopoList(orgList: IOrganization[]): TopoData[] {
  return [...orgList.reduce((map, org) => {
    Object.entries(org.data).forEach((item) => {
      const [topology, count] = item
      map.set(topology, (map.get(topology) || 0) + count)
    })
    return map
  }, new Map<string, number>())]
  .sort((a, b) => b[1] - a[1])
}

/**
 * Perform topology stats aggregation based on a regular expression.
 *
 * @param regex a regular expression for matching password topologies
 *
 */
export function aggregate(regex: RegExp) {
  return topoList
    .filter(entry => regex.test(entry[0]))
    .reduce((total, entry) => total += entry[1], 0)
}

/**
 * Return the ratio of topologies that match the given expression.
 *
 * @param regex
 */
export function ratio(regex: RegExp) {
  return aggregate(regex) / topoCount
}

/**
 * Return the topology ratio of the given expression as a percentage.
 *
 * @param regex
 */
export function ratioAsPercentage(regex: RegExp) {
  const pct = 100 * ratio(regex)
  return +pct.toFixed(2)
}

/**
 * Return the top n most common topologies.
 *
 * @param num
 */
export function top(num=0) {

  if (!num) {
    return new Map(topoList.slice(0))
  }

  return new Map(topoList.slice(0, num))
}

// console.log(ratioAsPercentage(/^d+$/))
console.log(top(50))
