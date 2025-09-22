import { ApiTokenInput } from './ui/ApiToken';
import { HealthStatusIndicator } from './ui/HealthStatusIndicator';
import ModelSettings from './ui/ModelSettings';
export default function Dashboard({ setPage }) {
  return (
    <section className="mx-auto h-full items-center flex flex-col w-full max-w-screen-xl px-4 min-h-[calc(100vh-64px)]">
      <div className="text-center my-8">
        <header className="uppercase text-xl font-semibold text-blue-600 mb-2">
          Dashboard
        </header>
      </div>
        <div className='flex gap-4 justify-center flex-col'>
          <div className='flex gap-4 justify-center flex-row'>
            <ApiTokenInput/>
            <HealthStatusIndicator interval={12000}/>
          </div>
            <ModelSettings/>
        </div>
    </section>
  );
}
