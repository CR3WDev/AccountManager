import { ContextMenu } from 'primereact/contextmenu';
import { TabPanel, TabView } from 'primereact/tabview';
import { useEffect, useRef, useState } from 'react';
import { BillType, IBill } from '../../types/bills';
import { getBills } from './AccountManagerService';
import { AccountManagerTable } from './components/AccountManagerTable';
import { AccountManagerToolbar } from './components/AccountManagerToolbar';

export const AccountManagerPage = () => {
	const [bills, setBills] = useState<IBill[]>([]);
	const [sheets, setSheets] = useState([{ name: 'Planilha 1', id: 1 }]);
	const cm = useRef<ContextMenu>(null);

	const items = [
		{ label: 'Copiar', icon: 'pi pi-copy' },
		{ label: 'Renomear', icon: 'pi pi-copy' },
		{ label: 'Excluir', icon: 'pi pi-file-edit' },
	];
	const [refreshKey, setRefreshKey] = useState(0);

	useEffect(() => {
		getBills().then((data) => {
			setBills(data.data);
		});
	}, [refreshKey]);

	return (
		<>
			<ContextMenu model={items} ref={cm} breakpoint="767px" />
			<div className="p-3">
				<TabView
					panelContainerClassName="p-0 m-0"
					scrollable
					onContextMenu={(e) => {
						if (!cm.current) return;
						cm?.current?.show(e);
					}}
					onTabChange={(e) => {
						if (e.index === sheets.length) {
							setSheets((prev) => [
								...prev,
								{ name: 'Planilha nova', id: new Date().getUTCMilliseconds() },
							]);
						}
					}}
				>
					{sheets.map((sheet) => {
						return (
							<TabPanel header={sheet?.name} key={sheet?.id}>
								<AccountManagerToolbar />
								<AccountManagerTable
									type={BillType.Essential}
									bills={bills}
									setRefreshKey={setRefreshKey}
								/>
							</TabPanel>
						);
					})}
					<TabPanel header="+"></TabPanel>
				</TabView>
			</div>
		</>
	);
};
