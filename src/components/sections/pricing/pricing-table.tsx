import { Tooltip } from '@/components/ui/tooltip';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import type React from 'react';

const PricingTable: React.FC = () => {
  return (
    <div id="pricing-table" className="w-full overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse bg-black">
        <thead>
          <tr className="border-b border-t border-stone-800">
            <th className="p-6 text-left text-lg font-normal text-gray-200">
              User Costs (Monthly)
            </th>
            <th className="p-4 text-left text-lg font-normal text-gray-200">
              Personal
            </th>
            <th className="p-4 text-left text-lg font-normal text-gray-200">
              Business
            </th>
            <th className="p-4 text-left text-lg font-normal text-gray-200">
              Enterprise
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-400">
          <tr className="border-b border-stone-800">
            <td className="p-4 flex items-center gap-2">
              View User
              <Tooltip content="Users who can view projects">
                <InfoCircledIcon className="h-4 w-4" />
              </Tooltip>
            </td>
            <td className="p-4">$0</td>
            <td className="p-4">$0</td>
            <td className="p-4">Custom</td>
          </tr>
          <tr className="border-b border-stone-800">
            <td className="p-4 flex items-center gap-2">
              Full User
              <Tooltip content="Users with full access">
                <InfoCircledIcon className="h-4 w-4" />
              </Tooltip>
            </td>
            <td className="p-4">-</td>
            <td className="p-4">$99</td>
            <td className="p-4">Custom</td>
          </tr>

          <tr className="border-b border-stone-800">
            <td colSpan={4} className="p-6 text-lg font-normal text-gray-200">
              Organization Built-in Cloud costs (Monthly)
            </td>
          </tr>

          <tr className="border-b border-gray-800">
            <td className="p-4 flex items-center gap-2">
              Deploys
              <Tooltip content="Number of deploys per month">
                <InfoCircledIcon className="h-4 w-4" />
              </Tooltip>
            </td>
            <td className="p-4">1000</td>
            <td className="p-4">2000</td>
            <td className="p-4">Custom</td>
          </tr>
          <tr className="border-b border-gray-800">
            <td className="p-4 flex items-center gap-2">
              Bandwidth
              <Tooltip content="Monthly bandwidth allocation">
                <InfoCircledIcon className="h-4 w-4" />
              </Tooltip>
            </td>
            <td className="p-4">30gb</td>
            <td className="p-4">60gb</td>
            <td className="p-4">Custom</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PricingTable;
