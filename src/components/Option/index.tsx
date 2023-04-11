import { useEffect } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../styles/theme";

import {
  Canvas,
  Skia,
  Path,
  useValue, // No Skia essa é a propriedade, diferente do reanimated que é o useSharedValue.
  runTiming, //
  BlurMask,
  Circle,
  Easing,
} from "@shopify/react-native-skia";

type Props = TouchableOpacityProps & {
  checked: boolean;
  title: string;
};

const CHECK_SIZE = 28;
const CHECK_STROKE = 2;
const RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2;
const CENTER_CIRCLE = RADIUS / 2;

export function Option({ checked, title, ...rest }: Props) {
  const percentage = useValue(0);
  const circle = useValue(0);

  const path = Skia.Path.Make();
  path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS);

  //Utilizo o useEffect para toda vez que o estado de checked mudar, renderizo o useEffect.
  //Fazendo uma verificação se está selecionado ou não.
  useEffect(() => {
    if (checked) {
      //percentage.current = 1;
      runTiming(percentage, 1, { duration: 650 });
      runTiming(circle, CENTER_CIRCLE, { easing: Easing.bounce });
      //Passa a variável para modificar, o valor que eu quero atribuir, e um objeto para definir alguma configuração.
    } else {
      //percentage.current = 0;
      runTiming(percentage, 0, { duration: 650 });
      runTiming(circle, 0, { duration: 275 });
      //Passa a variável para modificar, o valor que eu quero atribuir, e um objeto para definir alguma configuração.
    }
  }, [checked]);

  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.checked]}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>

      <Canvas style={{ height: CHECK_SIZE * 2, width: CHECK_SIZE * 2 }}>
        <Path
          path={path}
          color={THEME.COLORS.GREY_500}
          style="stroke"
          strokeWidth={CHECK_STROKE}
        />

        <Path
          path={path}
          color={THEME.COLORS.BRAND_LIGHT}
          style="stroke"
          strokeWidth={CHECK_STROKE}
          start={0}
          end={percentage}
        >
          <BlurMask blur={2} style="solid" />
        </Path>

        <Circle
          cx={CHECK_SIZE}
          cy={CHECK_SIZE}
          r={circle}
          color={THEME.COLORS.BRAND_LIGHT}
        >
          <BlurMask blur={2} style="solid" />
        </Circle>
      </Canvas>
    </TouchableOpacity>
  );
}
