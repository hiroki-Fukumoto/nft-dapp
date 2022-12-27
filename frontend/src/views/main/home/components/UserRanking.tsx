// TODO
import { UserRanking as TUserRanking } from '@mainViews/home/HomeVM'

interface Props {
  rankings: TUserRanking[]
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export const UserRanking = (props: Props) => {
  const { rankings, onClick } = props

  const getRankingTable = (users: TUserRanking[]) => {
    if (users.length < 1) return <></>

    const key = users[0].rank
    return (
      <table key={`ranking-table-${String(key)}`} className="table-auto">
        <thead>
          <tr>
            <th className="text-sm w-1/12"></th>
            <th className="text-sm text-gray-500 w-2/12">Collection</th>
            <th className="text-sm w-3/12"></th>
            <th className="text-sm text-gray-500 w-3/12">Floor</th>
            <th className="text-sm text-gray-500 w-3/12">Volume</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={`ranking-${u.rank}`} className="hover:bg-gray-100 cursor-pointer" onClick={onClick}>
              <td className="px-4 py-2 font-bold">{u.rank}</td>
              <td className="px-4 py-2">
                <img src={u.avatar_url} className="rounded-xl aspect-square" />
              </td>
              <td className="px-4 py-2 font-bold">{u.name}</td>
              <td className="px-4 py-2 font-bold text-right">{u.floor_price} ETH</td>
              <td className="px-4 py-2 font-bold text-right">{u.total_volume} ETH</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const getTableDOM = () => {
    if (rankings.length < 10) return []
    const dom = []
    const rankingUntil5th = rankings.slice(0, 4)
    const rankingUntil10th = rankings.slice(5, 9)
    const tableUntil5th = getRankingTable(rankingUntil5th)
    const tableUntil10th = getRankingTable(rankingUntil10th)
    dom.push(tableUntil5th)
    dom.push(tableUntil10th)
    return dom
  }

  return <div className="grid grid-cols-2 gap-4">{getTableDOM()}</div>
}
