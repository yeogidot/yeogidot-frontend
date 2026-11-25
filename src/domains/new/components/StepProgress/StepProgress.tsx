import classes from './StepProgress.module.css';

interface Props {
  /** 현재 진행 중인 단계 (1부터 시작) */
  current: number;
  /** 총 단계 수 */
  total: number;
  /** 단계별 안내 문구 (예: "여행 목록에 표시할 대표 사진을 선택해 주세요.") */
  description?: string | undefined;
}

export default function StepProgress({ current, total, description }: Props) {
  return (
    <section
      className={classes.container}
      aria-label={`${current}단계 / 총 ${total}단계`}
    >
      <span className={classes.stepPill}>
        {current} / {total} 단계
      </span>
      <div
        className={classes.stepTrack}
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
      >
        <div
          className={classes.stepFill}
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
      {description && <p className={classes.description}>{description}</p>}
    </section>
  );
}
