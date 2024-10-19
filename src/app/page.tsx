import { CardMetricCustomersCounter } from '~/components/cards/card-metric-customers-counter'
import { CardMetricInvoicesCounter } from '~/components/cards/card-metric-invoices-counter'
import { CardMetricTotalEnergyCompensated } from '~/components/cards/card-metric-total-energy-compensated'
import { CardMetricTotalEnergyConsumption } from '~/components/cards/card-metric-total-energy-consumption'
import { EnergyStatsChart } from '~/components/chats/energy-stats-chart'
import { EnergyValuesChart } from '~/components/chats/energy-values-chart'
import { Title } from '~/components/ui/title'

export default function HomePage() {
  return (
    <section className="flex w-full flex-col gap-4">
      <Title>Dashboard</Title>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CardMetricInvoicesCounter />
        <CardMetricCustomersCounter />
        <CardMetricTotalEnergyCompensated />
        <CardMetricTotalEnergyConsumption />
      </div>

      <EnergyStatsChart />
      <EnergyValuesChart />
    </section>
  )
}
