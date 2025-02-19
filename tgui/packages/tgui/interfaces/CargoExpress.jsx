import { useBackend } from '../backend';
import { AnimatedNumber, Box, Button, LabeledList, Section } from '../components';
import { Window } from '../layouts';
import { CargoCatalog } from './Cargo';
import { InterfaceLockNoticeBox } from './common/InterfaceLockNoticeBox';

export const CargoExpress = (props) => {
  const { act, data } = useBackend();
  return (
    <Window width={600} height={700}>
      <Window.Content scrollable>
        <InterfaceLockNoticeBox accessText="a QM-level ID card" />
        {!data.locked && <CargoExpressContent />}
      </Window.Content>
    </Window>
  );
};

const CargoExpressContent = (props) => {
  const { act, data } = useBackend();
  return (
    <>
      <Section
        title="Cargo Express"
        buttons={
          <Box inline bold>
            <AnimatedNumber value={Math.round(data.points)} />
            {' credits'}
          </Box>
        }>
        <LabeledList>
          <LabeledList.Item label="Landing Location">
            <Button content="Cargo Bay" selected={!data.usingBeacon} onClick={() => act('LZCargo')} />
            <Button selected={data.usingBeacon} disabled={!data.hasBeacon} onClick={() => act('LZBeacon')}>
              {data.beaconzone} ({data.beaconName})
            </Button>
            <Button content={data.printMsg} disabled={!data.canBuyBeacon} onClick={() => act('printBeacon')} />
          </LabeledList.Item>
          <LabeledList.Item label="Notice">{data.message}</LabeledList.Item>
        </LabeledList>
      </Section>
      <CargoCatalog express canOrder={data.canBeacon} />
    </>
  );
};
